import { useMutation } from '@tanstack/react-query';
import { useDifiStore } from '../../beautifulSugar/store';
import { hostname, request } from '../../utils/http';
import { useVisitor } from '../init/useInitVisitor';
import useCollectorCallback from '../useCollectorCallback';
import { useLogging } from '../useLogging';

export type DismissMutationData = {
  triggerId?: string
}

/**
 * Mutation to dismiss a persistent trigger (like a banner) and NOT show it again to the current visitor.
 */
export const useDismissMutation = <D extends DismissMutationData = {}>() => {
  const { log, error } = useLogging();
  const { appId } = useDifiStore((st) => st.difiProps);
  const { visitor } = useVisitor();

  const collectorCallback = useCollectorCallback();
  const url = `${hostname}/triggers/${appId}/${visitor.id}/dismissed`;

  const mutation = useMutation(
    (data: D) => request
      .put(url, {
        dismissedTriggers: [data],
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
