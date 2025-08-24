import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }
    // Compare password (assuming passwords are hashed)
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }
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
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Login failed', details: error }, { status: 500 })
  }
}
