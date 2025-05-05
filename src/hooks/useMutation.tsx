import { useState } from "react"

const useMutation = ({ url, method = 'POST' }: { url: string; method?: string }) => {
    const [state, setState] = useState({
        isLoading: false,
        error: ''
    })

    const fn = async (data:FormData) => {
        setState(prev => ({
            ...prev, isLoading: true
        }))

        try {
            const response = await fetch(url, {
              method: "POST",
              body: data,
            });
      
            if (response.ok) {
                setState({isLoading: false, error: ""})
            }else {
              const error = await response.status;
              setState({ isLoading: false, error: `Server error: ${error}` });
            }
      
          } catch (err) {
            setState({isLoading: false, error: `Error occured: ${err}`})
          }
    }

    return {mutate: fn, ...state}
}

export default useMutation