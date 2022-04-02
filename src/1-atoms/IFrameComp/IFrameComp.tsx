import React, { FC } from 'react';

export type T_IFrameComp_Props = {
    src: string;
    name: string;
};

const IFrameComp: FC<T_IFrameComp_Props> = ({ src, name }: T_IFrameComp_Props) => {
    return <iframe src={src} width="100%" height="100%" frameBorder="0" title={name} name={name} scrolling="no" />;
};

export default IFrameComp;
