import { _baseURL } from 'consts'
import LaravelEcho from 'laravel-echo'

/**
 *
 * @returns {LaravelEcho}
 */
const useLaravelEcho = () => {
	if (typeof window !== 'undefined' && window.Echo) {
		return window.Echo
	}

	if (typeof localStorage !== 'undefined') {
		const token = localStorage.getItem('token')
		if (!token) return null

		// Pusher
		window.Pusher = require('pusher-js')

		// New echo instance
		window.Echo = new LaravelEcho({
			encrypted: true,
			broadcaster: 'pusher',
			key: process.env.NEXT_PUBLIC_PUSHER_KEY,
			cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
			authEndpoint: _baseURL + '/broadcasting/auth',
			auth: {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		})

		return window.Echo
	}

	return null
}

export default useLaravelEcho
