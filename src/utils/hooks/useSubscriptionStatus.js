import { useSelector } from 'react-redux';

/**
 * Custom hook to check if a user has an active subscription
 * @returns {boolean} True if the user has both a subscription and a valid payment card
 */
export const useSubscriptionStatus = () => {
  const isSubscription = useSelector(state => state.user.isSubscription);
  const isPro = useSelector(state => state.user.isPro);
  
  return isSubscription && isPro;
};

export default useSubscriptionStatus;
