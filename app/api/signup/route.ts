import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, password } = await req.json()
    
    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ 
        error: 'All fields are required' 
      }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ 
      where: { email } 
    })
    
    if (existingUser) {
      return NextResponse.json({ 
        error: 'User with this email already exists' 
      }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)
    
    // Create user
    const user = await prisma.user.create({
      data: { 
        firstName, 
        lastName, 
        email, 
        password: hashedPassword,
        name: `${firstName} ${lastName}`,
        emailVerified: new Date()
      },
    })

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user
    
    // Generate JWT
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        firstName: user.firstName, 
        lastName: user.lastName 
      },
      process.env.JWT_SECRET || 'devsecret',
      { expiresIn: '7d' }
    )

    return NextResponse.json({ 
      user: userWithoutPassword, 
      token,
      message: 'User created successfully'
    })
  } catch (error) {
    console.error('Signup error:', error)
    
    if (error instanceof Error) {
      return NextResponse.json({ 
        error: 'Signup failed', 
        details: error.message 
      }, { status: 500 })
    }
    
    return NextResponse.json({ 
      error: 'Signup failed', 
      details: 'Unknown error occurred' 
    }, { status: 500 })
  }
}
