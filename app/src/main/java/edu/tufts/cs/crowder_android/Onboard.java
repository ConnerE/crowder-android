package edu.tufts.cs.crowder_android;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentActivity;
import android.support.v4.app.FragmentStatePagerAdapter;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import com.ogaclejapan.smarttablayout.SmartTabLayout;

public class Onboard extends FragmentActivity {

    private ViewPager pager;
    private SmartTabLayout indicator;

    FragmentStatePagerAdapter adapter = new FragmentStatePagerAdapter(getSupportFragmentManager()) {
        @Override
        public Fragment getItem(int position) {
            switch (position) {
                case 0 : return new onboardingFragment1();
                case 1 : return new onboardingFragment2();
                default: return null;
            }
        }

        @Override
        public int getCount() {
            return 2;
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_onboard);

        pager = (ViewPager)findViewById(R.id.pager);
        indicator = (SmartTabLayout)findViewById(R.id.indicator);

        pager.setAdapter(adapter);
        indicator.setViewPager(pager);
    }
}
