import { clsx } from 'clsx';

export const commonStyles = {
  // Base container styles
  container: {
    base: "bg-white rounded-[6px] border-[1px] border-[#E9E9E9]",
    shimmer: "shimmer-on-loading",
  },
  
  // Input styles
  input: {
    base: "bg-white text-[13px] leading-[107%] w-full",
    padding: "px-[18px] py-[15px]",
    error: "[&]:border-[#FF676A]",
  },
  
  // Select dropdown styles
  select: {
    dropdown: "absolute left-0 top-[59px] mt-1 w-full z-50 bg-white border border-[#E9E9E9] rounded-[6px] max-h-[134px] overflow-hidden",
  },
};

// Helper function to combine styles with error state
export const getInputStyles = (hasError: boolean, areErrorsVisible: boolean) => {
  return clsx(
    commonStyles.container.base,
    commonStyles.container.shimmer,
    commonStyles.input.base,
    commonStyles.input.padding,
    hasError && areErrorsVisible && commonStyles.input.error
  );
};

// Helper function for select dropdown styles
export const getSelectStyles = (maxHeight: number = 134) => {
  return clsx(
    commonStyles.select.dropdown,
    `max-h-[${maxHeight}px]`
  );
}; 