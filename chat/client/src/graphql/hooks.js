import { useMutation, useQuery } from '@apollo/client';
import { getAccessToken } from '../auth';
import { ADD_MESSAGE_MUTATION, MESSAGES_QUERY } from './queries';

export function useAddMessage() {
  const [mutate] = useMutation(ADD_MESSAGE_MUTATION);
  return {
    addMessage: async (text) => {
      const {
        data: { message },
      } = await mutate({
        variables: { input: { text } },
        context: {
          headers: { Authorization: 'Bearer ' + getAccessToken() },
        },
        update: (cache, data) => {
          const messeagedata = cache.readQuery({
            query: MESSAGES_QUERY,
          });

          cache.writeQuery({
            query: MESSAGES_QUERY,
            data: { messages: [...messeagedata.messages, data.data.message] },
          });
        },
      });
      return message;
    },
  };
}

export function useMessages() {
  const { data } = useQuery(MESSAGES_QUERY, {
    context: {
      headers: { Authorization: 'Bearer ' + getAccessToken() },
    },
  });
  return {
    messages: data?.messages ?? [],
  };
}
