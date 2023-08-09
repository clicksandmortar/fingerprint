import { CollectorResponse, CollectorUpdate, Trigger } from './types'
import { getCookie, setCookie } from '../utils/cookies'

// Local implementation of collector which does not make a network request
// This is a mock implementation of the collector which returns a CollectorResponse
// based on the data passed in. This is useful for testing the collector without
// having to make a network request.
export const sendEvent = (data: CollectorUpdate): CollectorResponse => {
  console.log('Server received event', data)

  const firstSeen: string = getCookie('firstSeen')
    ? getCookie('firstSeen') || ''
    : setCookie('firstSeen', new Date().toISOString()) || ''

  const lastSeen: string = getCookie('lastSeen')
    ? getCookie('lastSeen') || ''
    : setCookie('lastSeen', new Date().toISOString()) || ''

  // Always update last seen
  setCookie('lastSeen', new Date().toISOString())

  // Get visits from Cookies or set to 0
  const previousVisits: number = getCookie('visits')
    ? parseInt(getCookie('visits') || '0')
    : 0

  const visits: number = previousVisits + 1

  // Always update visits
  setCookie('visits', visits.toString())

  const trigger = getTrigger({
    ...data,
    firstSeen,
    lastSeen,
    visits
  })

  return {
    firstSeen: new Date(firstSeen),
    lastSeen: new Date(lastSeen),
    visits,
    trigger
  }
}

const getTrigger = (data: any): Trigger => {
  const trigger: Trigger = {}
  const context = {
    firstSeen: data.firstSeen,
    lastSeen: data.lastSeen,
    visits: data.visits
  }
  const brand = getBrand(data?.page?.url)
  const offer = getOffer(data?.page?.url)
  const url = getUrl(data?.page?.url)

  if (!brand || !offer) {
    return trigger
  }

  // User landing from FB Ads to the Home page (where all branded sites are listed)
  if (
    data?.referrer?.utm?.campaign === 'UTM_OFFER' &&
    data?.page?.path === '/'
  ) {
    trigger.id = 'fb_ads_homepage'
    trigger.behaviour = 'modal'
    trigger.data = {
      text: 'Get your ' + offer + '!',
      message:
        'Find the closest location to you and complete your booking now to get ' +
        offer +
        '',
      button: 'Start Booking',
      ...(url ? { url } : {}),
      ...context
    }
    trigger.brand = brand
  }

  return trigger
}

const getOffer = (url: string): string | undefined => {
  // if url contains tobycarvery.co.uk return Toby Carvery
  if (
    url.includes('tobycarvery.co.uk') ||
    url.includes('localhost:8000') ||
    url.includes('vercel.app')
  ) {
    return 'complimentary drink'
  }

  // if url contains browns-restaurants.co.uk return Browns
  if (url.includes('browns-restaurants.co.uk')) {
    return 'complimentary cocktail'
  }

  // if url contains vintageinn.co.uk return Vintage Inns
  if (url.includes('vintageinn.co.uk')) {
    return 'complimentary dessert'
  }

  return undefined
}

const getUrl = (url: string): string | undefined => {
  // When already on a book page, don't link out to book page
  if (
    url.includes('book.') ||
    url.includes('localhost:8000') ||
    url.includes('vercel.app')
  ) {
    return undefined
  }

  // if url contains tobycarvery.co.uk return Toby Carvery
  if (
    url.includes('tobycarvery.co.uk') ||
    url.includes('localhost:8000') ||
    url.includes('vercel.app')
  ) {
    return 'https://book.tobycarvery.co.uk/'
  }

  // if url contains browns-restaurants.co.uk return Browns
  if (url.includes('browns-restaurants.co.uk')) {
    return 'https://book.browns-restaurants.co.uk/'
  }

  // if url contains vintageinn.co.uk return Vintage Inns
  if (url.includes('vintageinn.co.uk')) {
    return 'https://book.vintageinn.co.uk/'
  }

  return undefined
}

const getBrand = (url: string): any => {
  // if url contains tobycarvery.co.uk return Toby Carvery
  if (
    url.includes('tobycarvery.co.uk') ||
    url.includes('localhost:8000') ||
    url.includes('vercel.app')
  ) {
    return {
      name: 'Toby Carvery',
      fontColor: '#ffffff',
      primaryColor: '#8c1f1f',
      overlayColor: 'rgba(96,32,50,0.5)',
      backgroundImage: 'https://d26qevl4nkue45.cloudfront.net/drink-bg.png'
    }
  }

  // if url contains browns-restaurants.co.uk return Browns
  if (url.includes('browns-restaurants.co.uk')) {
    return {
      name: 'Browns',
      fontColor: '#ffffff',
      primaryColor: '#B0A174',
      overlayColor: 'rgba(136, 121, 76, 0.5)',
      backgroundImage: 'https://d26qevl4nkue45.cloudfront.net/cocktail-bg.png'
    }
  }

  // if url contains vintageinn.co.uk return Vintage Inns
  if (url.includes('vintageinn.co.uk')) {
    return {
      name: 'Vintage Inns',
      fontColor: '#ffffff',
      primaryColor: '#B0A174',
      overlayColor: 'rgba(136, 121, 76, 0.5)',
      backgroundImage: 'https://d26qevl4nkue45.cloudfront.net/dessert-bg.png'
    }
  }
}
