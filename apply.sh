kubectl apply -f books_database/db_deploy.yml
kubectl apply -f books_database/db_service.yml

kubectl apply -f frontend/frontend_deploy.yml
kubectl apply -f frontend/frontend_service.yml

kubectl apply -f login/login_deploy.yml
kubectl apply -f login/login_service.yml