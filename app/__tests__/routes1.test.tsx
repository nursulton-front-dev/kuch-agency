import { generateStaticParams } from '@/app/services/[slug]/page'
import { services } from '@/data/services'

test('service params cover all services', async () => {
  const params = await generateStaticParams()
  expect(params.map((p: { slug: string }) => p.slug).sort()).toEqual(
    services.map(s => s.slug).sort()
  )
})
