import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, password } = await req.json()
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: { firstName, lastName, email, password: hashedPassword },
    })
    // Remove password from response
    const { password: _, ...userWithoutPassword } = user
    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName },
      process.env.JWT_SECRET || 'devsecret',
      { expiresIn: '7d' }
    );
    return NextResponse.json({ user: userWithoutPassword, token })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ error: 'Signup failed', details: error }, { status: 500 })
  }
}