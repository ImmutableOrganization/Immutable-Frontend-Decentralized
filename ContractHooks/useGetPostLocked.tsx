import { useContractRead } from 'wagmi';
import { contracts } from '../utils/contract_data';

export const useGetPostLocked = (postId: number) => {
	const { refetch } = useContractRead({
		addressOrName: contracts.PostContract.address,
		contractInterface: contracts.abi.BoardContract,
		functionName: 'getPostLocked',
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
