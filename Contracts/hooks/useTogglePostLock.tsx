import { useContext, useEffect } from 'react';
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
import { PopupContext } from '../../pages/_app';
import { contracts } from '../contract_data';

export const useTogglePostLock = (postId: number, lock: boolean) => {
	const { setFormError, setIsLoading } = useContext(PopupContext);
	const { setOpenToast, setToastMessage, setToastType } = useContext(PopupContext);

	const { config } = usePrepareContractWrite({
		addressOrName: contracts.PostContract.address,
		contractInterface: contracts.abi.BoardContract,
		functionName: 'togglePostLock',
		args: [postId, lock],
		chainId: contracts.PostContract.networkID,
		onError(error) {
			setFormError({ open: true, message: error.message });
		},
	});
	const { data, write, isLoading } = useContractWrite({
		...config,

		onSuccess() {
			setToastMessage(`${lock ? 'Locking' : 'Unlocking'}...`);
			setOpenToast(true);
			setToastType('loading');
		},
	});

	const { isSuccess } = useWaitForTransaction({
		hash: data?.hash,
	});
	useEffect(() => {
		if (isSuccess) {
			setToastMessage(`${lock ? 'Locked' : 'Unlocked'}.`);
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
