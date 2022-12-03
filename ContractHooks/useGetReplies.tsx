import { useContractRead } from 'wagmi';
import { contracts } from '../utils/contract_data';

export const useGetReplies = (postId: number, startingIndex: number, replyLimit: number) => {
	const { refetch } = useContractRead({
		addressOrName: contracts.PostContract.address,
		contractInterface: contracts.abi.BoardContract,
		functionName: 'getReplies',
		enabled: false,
		chainId: contracts.PostContract.networkID,
		args: [postId, startingIndex, replyLimit],
		onError(error) {
			console.log(error);
		},
	});

	return { refetch };
};
