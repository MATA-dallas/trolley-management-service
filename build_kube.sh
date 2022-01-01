eval $(minikube docker-env)
docker build -t mata-dallas/trolley-management-api:latest ./api

kubectl delete configmap trolley-management-api-config
kubectl create configmap trolley-management-api-config --from-env-file=./api/.env -o yaml
kubectl apply -f ./build
kubectl rollout restart deploy
