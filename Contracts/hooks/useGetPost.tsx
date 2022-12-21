import { useContractRead } from 'wagmi';
import { contracts } from '../contract_data';

export const useGetPost = (postId: number) => {
  const { refetch } = useContractRead({
    addressOrName: contracts.PostContract.address,
    contractInterface: contracts.abi.BoardContract,
    functionName: 'getPost',
    enabled: false,
    chainId: contracts.PostContract.networkID,
    args: [postId],
    onError(error) {
      console.log(error);
      // setFormError({ open: true, message: error.message });
    },
  });

  return { refetch };
};
