import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import * as layoutReducer from '@/store/layoutReducer'
import { AlertErrorIcon, AlertInfoIcon, AlertSuccessIcon, AlertWarningIcon, CrossIcon } from '@/icons'

const iconMap: Record<string, React.ReactNode> = {
  success: <AlertSuccessIcon />,
  info: <AlertInfoIcon />,
  warning: <AlertWarningIcon /> ,
  error: <AlertErrorIcon /> 
}

export const Snackbar = () => {

	const dispatch = useAppDispatch()
	const { isOpenSnackbar: isOpen, snackbarOption } = useAppSelector( state => state.layout )

	const {
		severity = 'success',
		variant = 'filled',
		title = '',
		message = '',
		// message = 'Snackbar message goes here',
		position = 'top-1 right-1',
		action = true,
		showSeverity = true,
		autoClose = false,
		closeTime = 4000,
		// onClose,
	} = snackbarOption


	const closeHandler = () => {
		dispatch( layoutReducer.setIsOpenSnackbar(false, { 
			severity: 'success', 
			title: '', 
			message: '', 
			autoClose: false
		}))
    // onClose?.();
	}

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        closeHandler();
      }, closeTime);
      return () => clearTimeout(timer)
    }
  }, [autoClose, closeTime, closeHandler])

  const getVariantClass = () => {
    const base = {
      success: {
        text: 'text-green-600 bg-green-50 border-green-100',
        outlined: 'text-green-600 border-green-600 bg-slate-50 ',
        filled: 'bg-green-500 text-white',
      },
      info: {
        text: 'text-sky-600 bg-sky-50 border-sky-100',
        outlined: 'text-sky-600 border-sky-600 bg-slate-50 ',
        filled: 'bg-sky-500 text-white',
      },
      warning: {
        text: 'text-orange-600 bg-orange-50 border-orange-100',
        outlined: 'text-orange-600 border-orange-600 bg-slate-50 ',
        filled: 'bg-orange-500 text-white',
      },
      error: {
        text: 'text-red-600 bg-red-50 border-red-100',
        outlined: 'text-red-600 border-red-600 bg-slate-50 ',
        filled: 'bg-red-500 text-white',
      },
    };
    return base[severity][variant];
  };

  const getTitleClass = () => {
    if (variant === 'filled') return 'font-semibold text-white';
    if (severity === 'success') return 'font-semibold text-green-900';
    if (severity === 'info') return 'font-semibold text-sky-900';
    if (severity === 'warning') return 'font-semibold text-orange-900';
    if (severity === 'error') return 'font-semibold text-red-900';
    return 'font-semibold';
  };

  const getMessageClass = () => {
    if (variant === 'filled') return 'text-white'
    if (severity === 'success') return 'text-green-900'
    if (severity === 'info') return 'text-sky-900'
    if (severity === 'warning') return 'text-orange-900'
    if (severity === 'error') return 'text-red-900'
    return ''
  }

  const getCloseBtnClass = () => {
    if (variant === 'filled') return 'hover:bg-opacity-60 active:bg-opacity-100';
    return 'hover:bg-opacity-20 active:bg-opacity-30'
  }

  return (
    <div
      className={`max-w-sm shadow-2xl z-50 fixed 
				${ isOpen ? 'flex' : 'hidden'} items-start gap-4 px-4 py-3 rounded border ${position} ${getVariantClass()}`}
    >
      {showSeverity && iconMap[severity]}
      <div className="flex-1">
        {title && <h1 className={getTitleClass()}>{title}</h1>}
        <p className={`line-clamp-2 ${getMessageClass()}`}>{message}</p>
      </div>
      {action && (
        <button
          type="button"
          onClick={closeHandler}
          className={`
						ml-auto rounded-full ${getCloseBtnClass()}
						border border-slate-100
						hover:border-slate-200
						hover:scale-105
						cursor-pointer
						`}
        > <CrossIcon className='size-4' /> </button>
      )}
    </div>
  );
};
