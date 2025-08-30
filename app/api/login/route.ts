import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
// nice one
const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    
    // Validate required fields
    if (!email || !password) {
      return NextResponse.json({ 
        error: 'Email and password are required' 
      }, { status: 400 })
    }

    // Find user by email
    const user = await prisma.user.findUnique({ 
      where: { email } 
    })
    
    if (!user) {
      return NextResponse.json({ 
        error: 'Invalid email or password' 
      }, { status: 401 })
    }

    // Check if user has a password (for OAuth users)
    if (!user.password) {
      return NextResponse.json({ 
        error: 'This account was created with Google. Please use Google Sign-In.' 
      }, { status: 401 })
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return NextResponse.json({ 
        error: 'Invalid email or password' 
      }, { status: 401 })
    }

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
      message: 'Login successful'
    })
  } catch (error) {
    console.error('Login error:', error)
    
    if (error instanceof Error) {
      return NextResponse.json({ 
        error: 'Login failed', 
        details: error.message 
      }, { status: 500 })
    }
    
    return NextResponse.json({ 
      error: 'Login failed', 
      details: 'Unknown error occurred' 
    }, { status: 500 })
  }
}
