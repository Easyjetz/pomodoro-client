import { useDispatch } from 'react-redux';
import { useMemo } from 'react'
import { bindActionCreators } from 'redux'

export function useActions(actions: any) {
    const dispatch = useDispatch()

    const boundActions = useMemo(() => {
        return bindActionCreators(actions, dispatch)
    }, [])

    return boundActions
}