import { useContext, useEffect } from 'react';
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
import { contracts } from '../utils/contract_data';
import { PopupContext } from '../pages/_app';

export const useNewPost = (parent: number, title: string, body: string) => {
	const { setFormError, setIsLoading } = useContext(PopupContext);
	const { setOpenToast, setToastMessage, setToastType } = useContext(PopupContext);

	const { config } = usePrepareContractWrite({
		addressOrName: contracts.PostContract.address,
		contractInterface: contracts.abi.BoardContract,
		functionName: 'newPost',
		args: [parent, title, body],
		chainId: contracts.PostContract.networkID,
		onError(error) {
			setFormError({ open: true, message: error.message });
		},
	});
	const { data, write, isLoading } = useContractWrite({
		...config,

		onSuccess() {
			setToastMessage(`Posting...`);
			setOpenToast(true);
			setToastType('loading');
		},
	});

	const { isSuccess } = useWaitForTransaction({
		hash: data?.hash,
	});
	useEffect(() => {
		if (isSuccess) {
			setToastMessage(`Posted`);
			setOpenToast(true);
			setToastType('success');
		}
		if (isLoading) {
			setIsLoading(true);
		} else {
			setIsLoading(false);
		}
	}, [isLoading, isSuccess]);

	return { write };
};
