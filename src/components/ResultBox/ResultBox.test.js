import ResultBox from './ResultBox';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Component ResultBox', () => {

  const testCases = [100, 20, 200, 345, 22.2, 50000];
  const negativeTestCases = [
    {amount: -5, from: 'USD', to: 'PLN'},
    {amount: -100, from: 'PLN', to: 'USD'},
    {amount: -50, from: 'PLN', to: 'USD'},
    {amount: -200, from: 'USD', to: 'PLN'},
  ];

  const formatterUSD = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const formatterPLN = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PLN',
  });

  for(const testAmount of testCases) {
    it('should render proper info about conversion when PLN -> USD', () => {
      render(<ResultBox from="PLN" to="USD" amount={testAmount} />);

      const output = screen.getByTestId('output');

      expect(output).toHaveTextContent(`${formatterPLN.format(testAmount).replace(/\u00a0/g, ' ')} = ${(formatterUSD.format(testAmount/3.5)).replace(/\u00a0/g, ' ')}`);
    });
    it('should render proper info about conversion when USD -> PLN', () => {
      render(<ResultBox from="USD" to="PLN" amount={testAmount} />);

      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(`${formatterUSD.format(testAmount).replace(/\u00a0/g, ' ')} = ${formatterPLN.format(testAmount * 3.5).replace(/\u00a0/g, ' ')}`)
    });
    it('should render proper info about conversion when PLN -> PLN', () => {
      render(<ResultBox from="PLN" to="PLN" amount={testAmount} />);

      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(`${formatterPLN.format(testAmount).replace(/\u00a0/g, ' ')} = ${formatterPLN.format(testAmount).replace(/\u00a0/g, ' ')}`)
    });
    it('should render proper info about conversion when USD -> USD', () => {
      render(<ResultBox from="USD" to="USD" amount={testAmount} />);

      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(`${formatterUSD.format(testAmount).replace(/\u00a0/g, ' ')} = ${formatterUSD.format(testAmount).replace(/\u00a0/g, ' ')}`)
    });
  }

  for(const negativeTestObj of negativeTestCases) {
    it('should render proper info when input is lower than 0', () => {
      render(<ResultBox {...negativeTestObj} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent('Wrong value...');
    });
  }
});