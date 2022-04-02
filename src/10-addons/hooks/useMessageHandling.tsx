import { useEffect, useState } from 'react';
import { useVariantState } from '../states/frameworkStates';
import { useMessages } from '../states/messageStates';

export const useMessageHandling = (): boolean => {
    const messageState = useMessages();
    const variantState = useVariantState();
    const [newMessageToShow, setNewMessageToShow] = useState<boolean>(false);

    // used for Messages from iFrame's
    useEffect(() => {
        const onSkeletoneMessageEvent = (event: any): void => {
            const { msgTitle, msgMessage, severity, msgError, popUpOnSkeleton } = event.detail;
            messageState.addNewMessage(msgTitle, msgMessage, severity, msgError, popUpOnSkeleton);
        };

        window.addEventListener('SkeletoneMessage', onSkeletoneMessageEvent);

        return () => {
            window.removeEventListener('SkeletoneMessage', onSkeletoneMessageEvent);
        };
    }, []);

    useEffect(() => {
        if (variantState.get() === 'embedded') {
            if (messageState.getLastNew()) {
                const msg = messageState.getLastNew();
                window.parent.dispatchEvent(
                    new CustomEvent('SkeletoneMessage', {
                        detail: { ...msg },
                    }),
                );
                messageState.deleteMsg(msg.time);
            }
        }
        if (variantState.get() === 'full') {
            if (
                messageState.getLastNew() &&
                messageState.getLastNew().popUpOnSkeleton &&
                messageState.getLastNew().popUpOnSkeleton === true &&
                messageState.getLastNew().new === true
            ) {
                setNewMessageToShow(true);
            }
        }
    }, [messageState]);
    return newMessageToShow;
};
