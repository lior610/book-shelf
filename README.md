# book-shelf
Attempt to create a nice book store that built out of 2 backends in python and frontend using react.
The backends get the information from mongoDB atlas cluster.

As the project grows, I created dockerfiles and applied it with docker-compose.
Later on, I created kubernetes manifests and created umbrella-chart that works with helm dependencies.
I created basic github workflow and 2 approaches to deploy it to argocd.
The first one is app of apps that made for learning the architecture and ignores the dependencies in helm to ensure independence of each component.
The second one is single app that uses the helm dependencies (this is the one that I am using for full pipeline using github actions and argocd)