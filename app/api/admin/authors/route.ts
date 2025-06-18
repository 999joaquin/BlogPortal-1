import { type NextRequest, NextResponse } from "next/server"
import { getAuthors, createAuthor, updateAuthor, deleteAuthor } from "@/lib/data"

export async function GET() {
  try {
    const authors = await getAuthors()
    return NextResponse.json({ success: true, data: authors })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const result = await createAuthor(data)
    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...data } = await request.json()
    const result = await updateAuthor(id, data)
    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    if (!id) {
      return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 })
    }
    const result = await deleteAuthor(Number.parseInt(id))
    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
