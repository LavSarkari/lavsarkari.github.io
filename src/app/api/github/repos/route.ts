import { NextResponse } from 'next/server'
import { getAllRepositories } from '@/lib/github'

export async function GET() {
  try {
    const repos = await getAllRepositories()
    return NextResponse.json(repos)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch repositories' }, { status: 500 })
  }
}