export async function GET() {
  try {
    const pdfUrl = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FAANGPath_Simple_Template-pDgUChMDW8a37kSaFPWQjfaTlmzkv9.pdf'
    
    const response = await fetch(pdfUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch resume')
    }

    const buffer = await response.arrayBuffer()

    return new Response(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Ayush_Kumar_Singh_Resume.pdf"',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    })
  } catch (error) {
    return new Response('Error downloading resume', { status: 500 })
  }
}
