import { NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export async function GET() {
  try {
    const { stdout, stderr } = await execAsync('npx prisma db push --accept-data-loss && npx prisma db seed')
    return NextResponse.json({ success: true, output: stdout, errors: stderr })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
