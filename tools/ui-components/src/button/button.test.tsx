import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { Button } from './button';

describe('Button', () => {
  it("should have the role 'button' and render the correct text", () => {
    render(<Button>Hello world</Button>);

    expect(
      screen.getByRole('button', { name: /hello world/i })
    ).toBeInTheDocument();
  });

  it("should have the type 'button' by default", () => {
    render(<Button>Hello world</Button>);

    expect(
      screen.getByRole('button', { name: /hello world/i })
    ).toHaveAttribute('type', 'button');
  });

  it("should have the type 'submit' if it is specified", () => {
    render(<Button type='submit'>Hello world</Button>);

    expect(
      screen.getByRole('button', { name: /hello world/i })
    ).toHaveAttribute('type', 'submit');
  });

  it('should trigger the onClick prop on click', () => {
    const onClick = jest.fn();

    render(<Button onClick={onClick}>Hello world</Button>);

    const button = screen.getByRole('button', { name: /hello world/i });

    userEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should set appropriate classes when Button size is large', () => {
    const classList = 'px-4 py-2.5 text-lg';
    render(<Button size='large'>Hello world</Button>);

    expect(screen.getByRole('button', { name: /hello world/i })).toHaveClass(
      classList
    );
  });

  it('should set appropriate classes when Button size is small', () => {
    const classList = 'px-2.5 py-1 text-sm';
    render(<Button size='small'>Hello world</Button>);

    expect(screen.getByRole('button', { name: /hello world/i })).toHaveClass(
      classList
    );
  });

  it('should set appropriate classes when Button variant is danger', () => {
    const classList = [
      'border-default-foreground-danger',
      'bg-default-background-danger',
      'text-default-foreground-danger',
      'hover:bg-default-background-danger-hover',
      'hover:text-default-foreground-danger-hover'
    ].join(' ');
    render(<Button variant='danger'>Hello world</Button>);

    expect(screen.getByRole('button', { name: /hello world/i })).toHaveClass(
      classList
    );
  });

  it('should set appropriate classes when Button variant is info', () => {
    const classList = [
      'border-default-foreground-info',
      'bg-default-background-info',
      'text-default-foreground-info',
      'hover:bg-default-background-info-hover',
      'hover:text-default-foreground-info-hover'
    ].join(' ');
    render(<Button variant='info'>Hello world</Button>);

    expect(screen.getByRole('button', { name: /hello world/i })).toHaveClass(
      classList
    );
  });
});
