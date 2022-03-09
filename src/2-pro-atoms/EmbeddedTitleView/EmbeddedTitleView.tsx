import React, { FC } from 'react';
import { Header, Heading } from 'grommet';

export type T_EmbeddedTitleView_Props = {
    title: string;
    isLandscape?: boolean;
    children: any;
};

const EmbeddedTitleView: FC<T_EmbeddedTitleView_Props> = ({
    title,
    isLandscape = false,
    children,
}: T_EmbeddedTitleView_Props): JSX.Element => {
    return (
        <Header background="dark-2" pad="xsmall">
            <Heading level="5" margin={{ horizontal: 'small', vertical: 'none' }} alignSelf="center">
                {title}
            </Heading>
            {isLandscape && children}
        </Header>
    );
};

export default EmbeddedTitleView;
