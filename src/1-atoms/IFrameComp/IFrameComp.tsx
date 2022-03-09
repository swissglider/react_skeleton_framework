import React, { FC } from 'react';

export type T_IFrameComp_Props = {
    src: string;
};

const IFrameComp: FC<T_IFrameComp_Props> = ({ src }: T_IFrameComp_Props) => {
    return <iframe src={src} width="100%" height="100%" frameBorder="0" title="iframe" scrolling="no" />;
};

export default IFrameComp;
