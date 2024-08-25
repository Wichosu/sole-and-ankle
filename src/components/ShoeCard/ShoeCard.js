import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const STYLES = {
    'on-sale': {
      '--bg-color': COLORS.primary,
      '--display': 'block',
    },
    'new-release': {
      '--bg-color': COLORS.secondary,
      '--display': 'block',
    },
    'default': {
      '--bg-color': 'transparent',
      '--display': 'none',
    }
  }

  let flagMessage = '';

  switch (variant) {
    case 'on-sale':
      flagMessage = 'Sale';
      break;
    case 'new-release':
      flagMessage = 'Just released!';
      break;
    default:
      break;
  }

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Flag style={STYLES[variant]}>{flagMessage}</Flag>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price style={{
            '--color': variant === 'on-sale' ? COLORS.gray[700] : 'black',
            '--text-decoration': variant === 'on-sale' ? 'line-through' : 'none'
          }}>
            {formatPrice(price)}
          </Price>
          <SalePrice>
            {typeof salePrice === 'number' ? formatPrice(salePrice) : ''}
          </SalePrice>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  width: 300px;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Flag = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin-right: -4px;
  background-color: var(--bg-color);
  color: ${COLORS.white};
  width: fit-content;
  border-radius: 2px;
  padding: 8px 10px;
  font-weight: ${WEIGHTS['bold']};
`

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  position: relative;
  display: flex;
  font-size: 1rem;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  color: var(--color);
  text-decoration: var(--text-decoration);
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  position: absolute;
  bottom: -20px;
  right: 0;
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
