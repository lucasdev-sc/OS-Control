import app_routes from "../../constants/app-routes"

const checkIsPublicRoute = (asPath: string) => {
    const appPublicRoutes = Object.values(app_routes.public);

    return appPublicRoutes.includes(asPath)
}

export default checkIsPublicRoute