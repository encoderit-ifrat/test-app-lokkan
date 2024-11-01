import * as React from 'react'
import useLaravelEcho from './useLaravelEcho'

const useChannel = (channelName, callback = (channel) => {}) => {
	const echo = useLaravelEcho()
	React.useEffect(
		() => {
			// Echo not available yet
			if (!echo) return () => {}

			// Join to the channel
			callback(echo.join(channelName))

			// Cleanup
			return () => {
				echo.leave(channelName)
			}
		},
		//
		[echo, channelName, callback]
	)
}

export default useChannel
