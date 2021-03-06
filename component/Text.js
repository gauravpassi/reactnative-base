// @flow
import * as React from 'react';
import {Text} from 'react-native';

import styleGuide, {StyleProps, Typographies} from '../config/styles';

/*
 * @Declaration props used in component.
 */
type TypographyProps = StyleProps & {
  type: $Keys<Typographies>,
  color: string,
  children: string,
  align: 'auto' | 'left' | 'right' | 'center' | 'justify',
  primary?: boolean,
  numberOfLines?: number,
};

class TextComponent extends React.PureComponent<TypographyProps> {
  static defaultProps = {
    type: 'body',
    color: styleGuide.palette.black,
    align: 'left',
  };

  render(): React.Node {
    const {
      theme,
      type,
      style,
      children,
      primary,
      numberOfLines,
      align: textAlign,
    } = this.props;
    const typography = styleGuide.typography[type];
    const color = (() => {
      if (primary) {
        return theme.palette.primary;
      } else if (typeof typography.color === 'string' && !this.props.color) {
        return typography.color;
      }
      return this.props.color;
    })();
    const computedStyle = [typography, {textAlign, color}];
    computedStyle.push(style);
    return (
      <Text style={computedStyle} {...{numberOfLines}}>
        {children}
      </Text>
    );
  }
}

export default TextComponent;
