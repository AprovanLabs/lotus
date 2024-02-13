.PHONY: dashboard
dashboard:
	(cd apps/dashboard && npm run build)
	dkn deploy
