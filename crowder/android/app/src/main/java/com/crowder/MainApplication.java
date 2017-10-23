package com.crowder;

import android.app.Application;

import com.facebook.react.ReactApplication;
import io.invertase.firebase.RNFirebasePackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.appevents.AppEventsLogger;
import android.content.Intent;
import com.reactnativenavigation.controllers.ActivityCallbacks;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;

import java.util.Arrays;
import java.util.List;


import com.reactnativenavigation.NavigationApplication;

public class MainApplication extends NavigationApplication {

    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

    private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

    protected static CallbackManager getCallbackManager() {
        return mCallbackManager;
    }



    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return Arrays.<ReactPackage>asList(
                new FBSDKPackage(mCallbackManager),
                new MainReactPackage(),
                new RNFirebasePackage(),
                new RNFirebaseAuthPackage()
        );
    }

        @Override
        public void onCreate() {
            super.onCreate();
            setActivityCallbacks(new ActivityCallbacks() {
                @Override
                public void onActivityResult(int requestCode, int resultCode, Intent data) {
                    mCallbackManager.onActivityResult(requestCode, resultCode, data);
                }
            });
            FacebookSdk.sdkInitialize(getApplicationContext());
            SoLoader.init(this, /* native exopackage */ false);
        }

}
