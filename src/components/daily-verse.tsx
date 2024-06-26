import type { GetVerseResponse } from '@/app/api/random-verse/route'
import { env } from '@/env'
import { api } from '@/utils/api'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'

async function getVerse(): Promise<GetVerseResponse> {
  const response = await api('/random-verse', {
    headers: {
      Authorization: `Bearer ${env.CRON_SECRET}`,
    },
    cache: 'force-cache',
    next: {
      tags: ['verse'],
    },
  })

  const verse = await response.json()

  return verse
}

export async function DailyVerse() {
  const { book, chapter, number, text } = await getVerse()

  return (
    <div className="px-6 md:w-[75%] lg:w-[70%] xl:w-[50%]">
      <Card>
        <CardHeader>
          <CardTitle>
            {book.name} - {chapter}:{number}
          </CardTitle>
          <CardDescription>
            Escrito por <span className="underline">{book.author}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h1>&quot;{text.replace('"', '')}&quot;</h1>
        </CardContent>
      </Card>
    </div>
  )
}
