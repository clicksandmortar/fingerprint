import { renderHook } from '@testing-library/react-hooks'
import { useEnvVars } from './useEnvVars'
import { FingerprintProvider } from '../context/FingerprintContext'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
})

describe('useEnvVars', () => {
  // it should return an object with the correct keys
  it('should return an object with the correct keys', async () => {
    const { result } = renderHook(() => useEnvVars(), {
      wrapper: FingerprintProvider,
      initialProps: {
        tenantId: 'mab',
        appId: 'test'
      }
    })
    expect(result.current).toHaveProperty('FINGERPRINT_API_HOSTNAME')
    expect(result.current).toHaveProperty('MIXPANEL_TOKEN')
  })
  it('should use the correct host domain for staging', async () => {
    const { result } = renderHook(() => useEnvVars(), {
      wrapper: FingerprintProvider,
      initialProps: {
        tenantId: 'example',
        appId: 'test'
      }
    })
    expect(result.current.FINGERPRINT_API_HOSTNAME).toContain(
      'clicksandmortar-staging.com/fingerprint'
    )
  })
  it('should use the correct host domain for production', async () => {
    const { result } = renderHook(() => useEnvVars(), {
      wrapper: FingerprintProvider,
      initialProps: {
        tenantId: 'mab',
        appId: 'test'
      }
    })
    expect(result.current.FINGERPRINT_API_HOSTNAME).toContain(
      'clicksandmortar-staging.com/fingerprint'
    )
  })
  it('should prepend the tenant id to the host domain', async () => {
    const testTable = [
      ['mab', 'mab.api.uk.clicksandmortar-staging.com/fingerprint'],
      ['example', 'example.api.uk.clicksandmortar-staging.com/fingerprint']
    ]

    testTable.forEach(([tenantId, expected]) => {
      const { result } = renderHook(() => useEnvVars(), {
        wrapper: FingerprintProvider,
        initialProps: {
          tenantId,
          appId: 'test'
        }
      })
      expect(result.current.FINGERPRINT_API_HOSTNAME).toContain(expected)
    })
  })
  it('should fallback to the default tenant id when not set', async () => {
    const { result } = renderHook(() => useEnvVars(), {
      wrapper: FingerprintProvider,
      initialProps: {
        tenantId: undefined,
        appId: 'test'
      }
    })
    expect(result.current.FINGERPRINT_API_HOSTNAME).toContain(
      'mab.api.uk.clicksandmortar-staging.com/fingerprint'
    )
  })
})
