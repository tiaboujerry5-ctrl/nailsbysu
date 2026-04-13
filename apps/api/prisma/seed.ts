import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing services
  await prisma.service.deleteMany()

  await prisma.service.createMany({
    data: [
      {
        name: 'Signature Gel-X Extensions',
        description: 'A full set using the Apres system for a lightweight, natural feel that mimics your natural nail. Perfect for the long, tapered shapes seen in our gallery.',
        duration: 90,
        price: 85,
        category: 'Extensions',
        isActive: true,
      },
      {
        name: 'The "Su" French',
        description: 'A modern, precision-painted take on the classic French tip. Tailored to your specific nail shape for a timeless, editorial look.',
        duration: 75,
        price: 75,
        category: 'Manicure',
        isActive: true,
      },
      {
        name: 'Structured Manicure',
        description: 'High-precision cuticle work combined with a structured gel overlay to provide strength and a flawless "grown-from-the-root" appearance.',
        duration: 80,
        price: 95,
        category: 'Manicure',
        isActive: true,
      },
      {
        name: 'Hand-Painted Art: Tier 1',
        description: 'Subtle accents such as delicate dots, single hearts, or minimalist lines on up to four nails.',
        duration: 20,
        price: 15,
        category: 'Nail Art',
        isActive: true,
      },
      {
        name: 'Hand-Painted Art: Tier 2',
        description: 'Detailed, custom-designed artistry including animal prints, chrome finishes, and abstract textures featured on our Instagram.',
        duration: 45,
        price: 45,
        category: 'Nail Art',
        isActive: true,
      },
      {
        name: 'Luxe Gel Pedicure',
        description: 'A restorative treatment including a sea salt soak, gentle exfoliation, and a long-lasting gel polish finish.',
        duration: 60,
        price: 65,
        category: 'Pedicure',
        isActive: true,
      },
      {
        name: 'Apres Removal & Refresh',
        description: 'Safe, non-damaging removal of existing Gel-X extensions followed by a mini-manicure to prep for your next set.',
        duration: 40,
        price: 30,
        category: 'Maintenance',
        isActive: true,
      },
      {
        name: 'Emergency Nail Repair',
        description: 'Individual repair for a chipped or broken extension to keep your set looking perfect between appointments.',
        duration: 15,
        price: 10,
        category: 'Maintenance',
        isActive: true,
      },
    ],
  })

  console.log('✓ Services seeded')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
