import sys
import joblib
import numpy as np

def predict(model_name, data):
    data = np.array(data, dtype=float).reshape(1, -1)
    model = joblib.load(f"models/{model_name}_model.pkl")
    scaler = joblib.load(f"models/{model_name}_scaler.pkl")
    scaled = scaler.transform(data)
    result = model.predict(scaled)
    return int(result[0])

if __name__ == "__main__":
    model_name = sys.argv[1]
    input_data = list(map(float, sys.argv[2:]))
    prediction = predict(model_name, input_data)

    if prediction == 1:
        print(f"The person is likely to have {model_name} condition.")
    else:
        print(f"The person is NOT likely to have {model_name} condition.")
