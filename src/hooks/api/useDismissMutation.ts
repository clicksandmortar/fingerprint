import { useMutation } from '@tanstack/react-query';
import { useDifiStore } from '../../beautifulSugar/store';
import { deviceInfo } from '../../utils/device';
import { hostname, request } from '../../utils/http';
import { getPagePayload } from '../../utils/page';
import { useVisitor } from '../init/useInitVisitor';
import useCollectorCallback from '../useCollectorCallback';
import { useLogging } from '../useLogging';

export type DismissMutationData = {
  campaignId: string;
  variantId: string;
};

/**
 * Mutation to dismiss a persistent trigger (like a banner) and NOT show it again to the current visitor.
 */
export const useDismissMutation = () => {
  const { log, error } = useLogging();
  const { appId } = useDifiStore((st) => st.difiProps);
  const { visitor } = useVisitor();

  const collectorCallback = useCollectorCallback();
  const url = `${hostname}/triggers/${appId}/${visitor.id}/dismissed`;

  const mutation = useMutation(
    (data: DismissMutationData[]) => request
      .put(url, {
        dismissedTriggers: data,
        visitor,
        page: getPagePayload(),
        device: deviceInfo,
      })
      .then((response) => {
        log('Trigger API response', response);
        return response;
      })
      .catch((err) => {
        error('Trigger API error', err);
        return err;
      }),
    {
      onSuccess: collectorCallback,
    },
  );

  return {
    ...mutation,
    dismissTrigger: mutation.mutate,
  };
};
