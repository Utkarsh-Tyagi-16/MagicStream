package routes

import (
	controller "github.com/GavinLonDigital/MagicStream/Server/MagicStreamServer/controllers"
	"github.com/GavinLonDigital/MagicStream/Server/MagicStreamServer/middleware"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/v2/mongo"
)

func SetupProtectedRoutes(router *gin.Engine, client *mongo.Client) {
	protected := router.Group("/")
	protected.Use(middleware.AuthMiddleWare())

	protected.GET("/movie/:imdb_id", controller.GetMovie(client))
	protected.POST("/addmovie", controller.AddMovie(client))
	protected.GET("/recommendedmovies", controller.GetRecommendedMovies(client))
	protected.PATCH("/updatereview/:imdb_id", controller.AdminReviewUpdate(client))

	// Watchlist routes
	protected.POST("/watchlist/add", controller.AddToWatchlist(client))
	protected.POST("/watchlist/remove", controller.RemoveFromWatchlist(client))
	protected.GET("/watchlist/:user_id", controller.GetWatchlist(client))
}
