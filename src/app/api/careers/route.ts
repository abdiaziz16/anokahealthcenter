import { NextRequest, NextResponse } from 'next/server';
import { sendJobApplicationEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const position = formData.get('position') as string;
    const resume = formData.get('resume') as File;

    // Debug logging
    console.log('Form data received:', {
      name: name ? 'present' : 'missing',
      email: email ? 'present' : 'missing',
      phone: phone ? 'present' : 'missing',
      position: position ? 'present' : 'missing',
      resume: resume ? 'present' : 'missing',
      resumeSize: resume?.size || 0
    });

    // Validate required fields
    if (!name || !email || !phone || !position || !resume) {
      const missingFields = [];
      if (!name) missingFields.push('name');
      if (!email) missingFields.push('email');
      if (!phone) missingFields.push('phone');
      if (!position) missingFields.push('position');
      if (!resume) missingFields.push('resume');
      
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(resume.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload a PDF or Word document.' },
        { status: 400 }
      );
    }

    // Validate file size (5MB limit)
    if (resume.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size too large. Please upload a file smaller than 5MB.' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const resumeBuffer = Buffer.from(await resume.arrayBuffer());

    // Send email
    const success = await sendJobApplicationEmail({
      name,
      email,
      phone,
      position,
      resume,
    }, resumeBuffer);

    if (success) {
      return NextResponse.json(
        { message: 'Application submitted successfully' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: 'Failed to submit application' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Job application error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
