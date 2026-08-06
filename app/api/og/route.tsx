// Open Graph Image Generation
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
    return new ImageResponse(
        (
            <div
                style={{
                    display: 'flex',
                    fontSize: 60,
                    color: 'black',
                    background: 'white',
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                CreateDOT
            </div>
        ),
        {
            width: 1200,
            height: 630,
        },
    )
}
