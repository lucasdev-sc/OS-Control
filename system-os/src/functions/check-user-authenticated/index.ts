import { getUserLocalStorage } from '@/utils/get-storage-user'

export const checkUserAuthenticated = () => {
    const userToken = getUserLocalStorage();

    return userToken ? true : false
    
}