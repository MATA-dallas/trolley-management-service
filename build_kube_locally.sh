docker build -t mata-dallas/trolley-management-api:latest ./api
eval $(minikube docker-env)
kubectl apply -f ./build
