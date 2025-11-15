// MINIMAL WORKING VERSION - Projects API
import { NextRequest, NextResponse } from 'next/server'
import { mockProjects } from '@/lib/mockData'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const category = searchParams.get('category')
  
  let filtered = mockProjects
  
  if (status) {
    filtered = filtered.filter(p => p.status === status)
  }
  
  if (category) {
    filtered = filtered.filter(p => p.category === category)
  }
  
  return NextResponse.json({ projects: filtered })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { title, description, category, budget, location } = body
  
  if (!title || !category) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }
  
  const newProject = {
    id: Date.now(),
    title,
    description,
    category,
    status: 'pending_approval',
    location: location || 'Athens, Greece',
    budgetNeeded: budget || 0,
    pledgedMoney: 0,
    pledgedHours: 0,
    pledgedMaterials: 0,
    createdAt: new Date().toISOString()
  }
  
  return NextResponse.json({ success: true, project: newProject })
}
