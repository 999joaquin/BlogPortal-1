import { type NextRequest, NextResponse } from "next/server"
import { getAllArticles, createArticle, updateArticle, deleteArticle } from "@/lib/data"

export async function GET() {
  try {
    const articles = await getAllArticles()
    return NextResponse.json({ success: true, data: articles })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const result = await createArticle(data)
    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...data } = await request.json()
    const result = await updateArticle(id, data)
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
    const result = await deleteArticle(Number.parseInt(id))
    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
