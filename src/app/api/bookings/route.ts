// Bookings API - Ραντεβού με Ειδικούς
import { NextRequest, NextResponse } from 'next/server'

// Mock data για testing
const mockBookings = [
  {
    id: '1',
    citizenId: 'user-citizen-1',
    professionalId: '1',
    professionalName: 'Γιάννης Παπαδόπουλος',
    profession: 'Ηλεκτρολόγος',
    serviceType: 'electrical',
    scheduledDate: '2025-11-20',
    scheduledTime: '10:00',
    durationHours: 2,
    address: 'Λεωφ. Αλεξάνδρας 123, Αθήνα',
    description: 'Επισκευή ηλεκτρολογικού πίνακα',
    status: 'confirmed',
    basePrice: 100,
    municipalitySubsidy: 70,
    citizenPays: 30,
    createdAt: '2025-11-10T10:00:00Z',
    updatedAt: '2025-11-10T10:00:00Z',
  },
  {
    id: '2',
    citizenId: 'user-citizen-1',
    professionalId: '2',
    professionalName: 'Μαρία Γεωργίου',
    profession: 'Υδραυλικός',
    serviceType: 'plumbing',
    scheduledDate: '2025-11-18',
    scheduledTime: '14:00',
    durationHours: 3,
    address: 'Πατησίων 45, Αθήνα',
    description: 'Επισκευή βρύσης κουζίνας και αλλαγή σωλήνων',
    status: 'pending',
    basePrice: 135,
    municipalitySubsidy: 99,
    citizenPays: 36,
    createdAt: '2025-11-12T15:30:00Z',
    updatedAt: '2025-11-12T15:30:00Z',
  },
]

// GET /api/bookings - Get bookings
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const citizenId = searchParams.get('citizenId')
    const professionalId = searchParams.get('professionalId')
    const status = searchParams.get('status')

    let filtered = [...mockBookings]

    // Filter by citizen
    if (citizenId) {
      filtered = filtered.filter(b => b.citizenId === citizenId)
    }

    // Filter by professional
    if (professionalId) {
      filtered = filtered.filter(b => b.professionalId === professionalId)
    }

    // Filter by status
    if (status) {
      filtered = filtered.filter(b => b.status === status)
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => 
      new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime()
    )

    return NextResponse.json({
      bookings: filtered,
      total: filtered.length,
      success: true,
    })
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bookings', success: false },
      { status: 500 }
    )
  }
}

// POST /api/bookings - Create new booking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validation
    const requiredFields = [
      'citizenId',
      'professionalId',
      'serviceType',
      'scheduledDate',
      'scheduledTime',
      'address',
      'description',
    ]

    const missingFields = requiredFields.filter(field => !body[field])

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: `Missing required fields: ${missingFields.join(', ')}`,
          success: false,
        },
        { status: 400 }
      )
    }

    // Validate date is in the future
    const bookingDate = new Date(`${body.scheduledDate}T${body.scheduledTime}`)
    if (bookingDate < new Date()) {
      return NextResponse.json(
        {
          error: 'Booking date must be in the future',
          success: false,
        },
        { status: 400 }
      )
    }

    // Calculate pricing (mock calculation)
    const durationHours = body.durationHours || 2
    const hourlyRate = 50 // This would come from the professional's profile
    const basePrice = hourlyRate * durationHours
    const municipalitySubsidy = basePrice * 0.7 // 70% subsidy
    const citizenPays = basePrice - municipalitySubsidy

    // Create new booking
    const newBooking = {
      id: `booking-${Date.now()}`,
      ...body,
      durationHours,
      status: 'pending', // Waiting for professional confirmation
      basePrice,
      municipalitySubsidy,
      citizenPays,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // In production: Save to Supabase and send notification to professional

    return NextResponse.json({
      booking: newBooking,
      message: 'Booking created successfully. Waiting for professional confirmation.',
      success: true,
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json(
      { error: 'Failed to create booking', success: false },
      { status: 500 }
    )
  }
}
