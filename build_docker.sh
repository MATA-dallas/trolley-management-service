eval $(minikube docker-env)
docker build -t mata-dallas/trolley-management-api:latest ./api
kubectl apply -f ./build
