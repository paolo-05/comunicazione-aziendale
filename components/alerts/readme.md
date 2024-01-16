# Custom Alerts

Firstly, these alerts are from Flowbite. Find more [here](https://flowbite.com/docs/components/alerts/#dismissing).

## Types of alert

Just like flowbite, we tried to include all the possible types of alerts. All of them are light/dark mode compatible and dismissable.

- Info alert (blue)
- Danger alert (red)
- Succes alert (green)
- Warning alert (yellow)
- General alert (grey)

## Getting started as using the alerts

```ts
type AlertProps = {
  show: boolean;
  message: string;
  onClose: () => void;
};
```

Keeping in mind this TS type you need to:

- Import the alert you need (e.g. we use the Danger one) in your component
- Pass by `props` all the data needed
- Set up the `react state` to handle the alert show variable.

Here you can see an example component that uses the Danger Alert.

```tsx
export default MyComponent = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>(
    "This is my custom alet message"
  );

  return (
    <>
      <DangerAlert
        show={showAlert}
        message={alertMessage}
        onClose={() => setShowAlert(false)}
      />
    </>
  );
};
```

### A quick note about the example and how we handle the alert close

In the example, in the `props` we did this:

```tsx
onClose={() =>setShowAlert(false)}
```

Why didn't we handle it directly in the component??

- Simply because by doing so, the user can close the alert in many different modes **if programmed** e.g. By pressing the Escape key.
