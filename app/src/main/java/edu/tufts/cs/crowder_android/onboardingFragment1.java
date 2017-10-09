package edu.tufts.cs.crowder_android;

import android.support.v4.app.Fragment;;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

/**
 * Created by connererickson on 10/8/17.
 */

public class onboardingFragment1 extends Fragment {

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle s) {

        return inflater.inflate(
                R.layout.onboarding_screen1,
                container,
                false
        );
    }
}